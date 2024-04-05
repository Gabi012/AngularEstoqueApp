import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { GetAllProductsResponse } from 'src/app/models/interface/products/response/GetAllProductsResponse';
import { ProductsService } from 'src/app/services/products/products.service';
import { ProductsDataTranferService } from 'src/app/shared/services/products/products-data-tranfer.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: []
})
export class DashboardHomeComponent implements OnInit, OnDestroy{
  private destroy$ = new Subject<void>();
    public productsList: Array<GetAllProductsResponse> = [];

  constructor(private productsService: ProductsService,
    private messageService: MessageService,
    private productsDataTransferService : ProductsDataTranferService
    ){}


  ngOnInit(): void {
    this.GetProdutsDatas();

  }

  GetProdutsDatas(): void {
    this.productsService.getAllProducts()
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe
    ({
      next: (response) => {
        if(response.length > 0){
            this.productsList = response;
            this.productsDataTransferService.setProductsDatas(this.productsList);

        }
      },
      error: (err) => {
        console.log(err);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao buscar produtos!',
          life: 2500,
        })
      }
    });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
   }

}
