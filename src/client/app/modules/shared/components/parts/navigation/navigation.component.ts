import {
    AfterContentChecked,
    ChangeDetectionStrategy,
    Component,
    Input,
    OnInit,
} from '@angular/core';
import { factory } from '@cinerino/sdk';

let products: (
    | factory.product.IProduct
    | factory.service.paymentService.IService
)[] = [];

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent implements OnInit, AfterContentChecked {
    @Input() public products: (
        | factory.product.IProduct
        | factory.service.paymentService.IService
    )[];
    public ProductType = factory.chevre.product.ProductType;
    public navigationLength: number;

    constructor() {}

    public ngOnInit() {
        this.navigationLength = 1;
        if (products === undefined) {
            return;
        }
        this.products = products;
    }

    public ngAfterContentChecked() {
        if (this.products === undefined) {
            return;
        }
        products = this.products;
        this.navigationLength =
            this.isVisible(
                factory.chevre.product.ProductType.MembershipService
            ) && this.isVisible(factory.chevre.product.ProductType.PaymentCard)
                ? 3
                : this.isVisible(
                      factory.chevre.product.ProductType.MembershipService
                  ) ||
                  this.isVisible(factory.chevre.product.ProductType.PaymentCard)
                ? 2
                : 1;
    }

    public isVisible(productType: factory.chevre.product.ProductType) {
        return (
            this.products !== undefined &&
            this.products.find((p) => p.typeOf === productType) !== undefined
        );
    }
}
