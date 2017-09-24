import { Injectable, EventEmitter } from "@angular/core";
import Category from "../Model/category";

@Injectable()
export default class UIEventsService{

    public onCategorySelected = new EventEmitter<Category>();

    constructor(){

    }

}