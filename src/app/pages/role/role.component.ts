import { Component, OnInit, ViewChild } from '@angular/core';
import { BreadcrumbComponent } from '@modules/shared/breadcrumb/breadcrumb.component';
import { MenuService } from '@services/menu.service';
import { RoleService } from '@services/role.service'
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';
declare var common;
@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss'],
  providers:[RoleService, MenuService]
})
export class RoleComponent implements OnInit {
  
  roleList:any=[]; 
  loading:boolean=false;
  menues: any;
  checkallchk = false;
  roledata: any = {
    id: 0,
    name: '',
    menus: [],
    active: false
  }
  menuedit: { id: any; menus: any; };
  buttons:any=[];

  constructor(private roleService:RoleService,private menuService:MenuService,private toastr: ToastrService) { }
  
  ngOnInit(): void {
    this.buttons=[{
      type:'submit',class:'btn btn-primary',label:'Submit',icon:'fa fa-save',disabled:true,action:'save',access:'add'
    },{
      type:'button',class:'btn btn-danger',label:'Reset',icon:'fa fa-reload',disabled:false,action:'reset',access:'add'
    }];
    this.loadRoles();
    this.fetchMenu();
  }

  buttonClick(event){
    switch(event){
      case 'save':this.save();
          break;
      case 'reset':this.clear();
          break;
      default:return true;
    }
  }

  loadRoles(){
    this.roleService.getAll().subscribe((res:any)=>{
      if(res.resultKey==1){
        this.roleList=res.resultValue;
      }
      else {
        console.log('Role Error',res.defaultError);
      }
    },(e)=>{
      console.log(e);
    })
  }

  fetchMenu() {
    this.menuService.getAll().subscribe(data => {
      if (data.resultKey == 1) {
        this.menues = this.simplifydata(common.menubind(data.resultValue));
      }
    })
  }
  
  simplifydata(menu) {

    let menun = [];
    for (var k in menu) {
      const mainmenu = menu[k]
      // if (mainmenu.label === 'Reports') {
      //   debugger
      // }

      let parantname = "";
      if (mainmenu.isclickable == 0) {
        parantname = mainmenu.menu;
      } else {
        mainmenu.parent = 'test';
        let action = (mainmenu.action!=null)?mainmenu.action.split(','):[];
        var d = [];
        for (let l = 0; l < action.length; l++) {
          const act = action[l];
          d.push({ act: false, val: act });

        }
        mainmenu.act = false;
        mainmenu.action = d;

        menun.push(mainmenu);
      }

      let child = mainmenu.children;
      this.pushChilds(child, menun, parantname);
    }
    return menun;
  }


  pushChilds(child, menun, parantname) {
    if (!child) {
      return;
    }

    for (let i = 0; i < child.length; i++) {

      let element = child[i];

      if (element.isclickable == 0) {

        console.log(parantname);
        let parent =  parantname + ' > ' + element.menu;
        if (element.children) {
          this.pushChilds(element.children, menun, parent);
          
        }
      } else {
        if (!element.action) {
          return;
        }
        let action = element.action.split(',');
        var d = [];
        for (let l = 0; l < action.length; l++) {
          const act = action[l];
          d.push({ act: false, val: act });

        }
        element.action = d;
        element.act = false;
        element.parant = parantname;
        menun.push(element);
      }
    }
  }

  selectdRole = undefined;

  fillMenu(itemData) {
    this.clear();
    this.selectdRole = itemData;
    // debugger
    if (itemData.menus !== null) {
      var existMenu = (Array.isArray(itemData.menus))?itemData.menus:JSON.parse(itemData.menus);
      for (var i in existMenu) {
        let itm = existMenu[i];
        const d = this.menues.find((a) => {
          return a.id === itm.id
        })
        if (d != undefined) {
          var action = d.action;
          for (var j in action) {
            if(itm.action==null) continue;
            if (itm.action.includes(action[j].val)) {
              action[j].act = true;
            }
          }
        }
      }
    }
    this.roledata = { id: itemData.id,name:itemData.name, menus: this.menues , active:(itemData.deleted_at==null)?true:false };
    this.selectdRole = itemData;
    this.buttons[0]['disabled']=false;
  }

  clearAllMenu() {
    for (var i in this.menues) {
      let item = this.menues[i];
      item.act = false;
      if (item.action) {
        for (let index = 0; index < item.action.length; index++) {
          const element = item.action[index];
          element.act = false;
        }
      }
    }
  }

  clear() {
    this.clearAllMenu();
    this.roledata = {
      id: 0,
      name: '',
      menus: [],
      active: false
    }
    this.selectdRole = undefined;
    this.buttons[0]['disabled']=true;
  }

  checkAll() {
    let a = this.menues;
    for (let index = 0; index < a.length; index++) {
      a[index].act = this.checkallchk;
      this.selectAll(a[index]);
      }
  }

  selectAll(menu) {
    for (var i in menu.action) {
      menu.action[i]['act'] = menu.act;
    }
  }
  deselectMenu(menu) {
    for (var i in menu.action) {
      if (menu.action[i].act === false) {
        menu.act = false;
        break
      }
    }
  }

  selectMainMenu(menu) {
    for (let k = 0; k < menu.value.length; k++) {
      const element = menu.value[k];
      element.act = menu.act;
      this.selectAll(element)
    }
  }

  save() {
    if (this.selectdRole === undefined) {
      return false;
    }
    // prepare data for save
    var a = [];
    for (var i in this.menues) {
      let b = [];
      var action = this.menues[i].action;
      for (var j in action) {
        if (action[j].act === true) { b.push(action[j].val); }
      }
      a.push({ id: this.menues[i].id, action: b.toString() });
    }
    this.roledata.menus = a;
    
    if(this.roledata.id==0){
      this.roleService.post(this.roledata).subscribe((data: any) => {
        if (data.resultKey == 1) {
          this.loadRoles();
          this.clear();
          this.toastr.success('Role created successfully');
        }
        else {
          this.toastr.error('Error while creating Role');
        }
      });
    } else {
      this.roleService.put(this.roledata).subscribe((data: any) => {
        if (data.resultKey == 1) {
          this.loadRoles();
          this.clear();
          this.toastr.success('Role updated successfully');
        }
        else {
          this.toastr.error('Error while updating Role');
        }
      });
    }
    this.buttons[0]['disabled']=true;
    
  }

  add() {
    let index = this.roleList.findIndex((a)=>{
      return a.name.toLowerCase()==this.roledata.name.toLowerCase();
    });
    if(index>-1){
      alert('Rolename is already exist');
      return false;
    }
    this.fillMenu(this.roledata);
  }

  edit(item){
    this.buttons[0]['disabled']=false;
    this.roledata.id = item.id;
    this.roledata.name = item.name;
    this.roledata.menus = item.menus;
    this.roledata.active = item.deleted_at==null?true:false;
    this.fillMenu(item);
  }
}
