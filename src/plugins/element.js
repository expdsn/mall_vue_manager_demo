import Vue from 'vue'
import VueRouter from 'vue-router'

import {
    Dialog,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    Input,
    Switch,
    Select,
    Option,
    OptionGroup,
    Button,
    ButtonGroup,
    Table,
    TableColumn,
    Form,
    FormItem,
    Tabs,
    Icon,
    Row,
    Col,
    Container,
    Header,
    Aside,
    Main,
    PageHeader,
    Loading,
    MessageBox,
    Message,
    Collapse,
    CollapseItem,
    Radio,
    RadioGroup,
    RadioButton,
    Divider,
    Empty,
    Breadcrumb,
    Alert,
    Popover,
    BreadcrumbItem,
    Tag,
    Checkbox,
    Steps,
    Step
  } from 'element-ui';
  Vue.use(Steps)
  Vue.use(Step)
  Vue.use(Checkbox)
  Vue.use(Popover)
  Vue.use(Tag)
  Vue.use(Empty)
  Vue.use(Alert)
  Vue.use(Breadcrumb)
  Vue.use(BreadcrumbItem)
  Vue.use(Divider)
  Vue.use(Radio);
  Vue.use(RadioButton)
  Vue.use(RadioGroup)
  Vue.use(Collapse);
  Vue.use(CollapseItem);
  Vue.use(Dialog);
  Vue.use(Dropdown);
  Vue.use(DropdownMenu);
  Vue.use(DropdownItem);
  Vue.use(Menu);
  Vue.use(Submenu);
  Vue.use(MenuItem);
  Vue.use(MenuItemGroup);
  Vue.use(Input);
  Vue.use(Switch);
  Vue.use(Select);
  Vue.use(Option);
  Vue.use(OptionGroup);
  Vue.use(Button);
  Vue.use(ButtonGroup);
  Vue.use(Table);
  Vue.use(TableColumn);
  Vue.use(Form);
  Vue.use(FormItem);
  Vue.use(Tabs);
  Vue.use(Icon);
  Vue.use(Row);
  Vue.use(Col);
  Vue.use(Container);
  Vue.use(Header);
  Vue.use(Aside);
  Vue.use(Main);
  Vue.use(PageHeader);
  Vue.use(Loading.directive);
Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$message = Message;

VueRouter.prototype.$message = Message;

