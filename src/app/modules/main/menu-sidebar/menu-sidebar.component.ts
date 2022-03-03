import {Component, OnInit} from '@angular/core';
import {GlobalService} from "@services/global.service";
import { MenuService } from '@services/menu.service';


@Component({
    selector: 'app-menu-sidebar',
    templateUrl: './menu-sidebar.component.html',
    styleUrls: ['./menu-sidebar.component.scss'],
    providers:[MenuService]
})
export class MenuSidebarComponent implements OnInit {
    public user;
    //public menu=MENU;
    public menu=[];
    constructor(private globalService:GlobalService, private menuService:MenuService) {}

    ngOnInit() {
        this.user = this.globalService.getUser;
        this.loadMenu();
    }

    loadMenu(){
        this.menuService.getAll().subscribe((res:any)=>{
            if(res.resultKey==1)
            {
                this.generateData(res.resultValue);
            }
            else {
                this.menu=[];
            }
        })
    }

    generateData(menu){
        this.menu=[]
        for (let i = 0; i < menu.length; i++) {
            const element = menu[i];
            if(element.active){
                if(element.parent_id==0){
                    this.menu.push({
                        name:element.menu,
                        icon:element.icon,
                        id:element.id,
                        path:[element.route]
                    })
                }
                else {
                    let parentIndex = this.menu.findIndex((a)=>{
                        return a.id==element.parent_id;
                    });
                    if(parentIndex>-1){ 
                        delete this.menu[parentIndex]['path'];
                        if(this.menu[parentIndex]['children']){
                            this.menu[parentIndex]['children'].push({
                                name:element.menu,
                                icon:element.icon,
                                path:[element.route],
                            });
                        }
                        else {
                            this.menu[parentIndex]['children']=[];
                            this.menu[parentIndex]['children'].push({
                                name:element.menu,
                                icon:element.icon,
                                path:[element.route]
                            });
                        }
                        
                    }
                }
            }
        }
        console.log(this.menu);
    }
}


export const MENU = [
    {
        name: 'Dashboard',
        path: ['/']
    },
    {
        name: 'Blank',
        path: ['/blank']
    },
    {
        name: 'User',
        children: [
            {
                name: 'Role',
                path: ['/role']
            },

            {
                name: 'Blank', 
                path: ['/sub-menu-2']
            }
        ]
    }
];
