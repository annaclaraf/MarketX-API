import { BaseModelFilter } from '@ioc:Adonis/Addons/LucidFilter'
import { ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'
import Product from '../Product'


export default class ProductFilter extends BaseModelFilter {
    public $query: ModelQueryBuilderContract<typeof Product, Product>

    public name(name: string): void {
        this.$query.where('name','LIKE',  `%${name}%`)
    }

    public category(categoryId: number): void {
        this.$query.whereHas('category', (builder) => {
            builder.where('id', `%${categoryId}%`)
        })
    }

    public brand(brand: string): void {
        this.$query.where('brand', `%${brand}%`)
    }

    public priceRange(min: number, max: number): void {
        this.$query.whereBetween('price', [min,max])
    }
}