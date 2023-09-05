import { LayoutDashboardIcon,TruckDeliveryIcon, BuildingWarehouseIcon , ArchiveIcon} from 'vue-tabler-icons';

export interface menu {
    header?: string;
    title?: string;
    icon?: any;
    to?: string;
    chip?: string;
    chipColor?: string;
    chipVariant?: string;
    chipIcon?: string;
    children?: menu[];
    disabled?: boolean;
    type?: string;
    subCaption?: string;
}

const sidebarItem: menu[] = [
    { header: 'Inicio' },
    {
        title: 'MENU',
        icon: LayoutDashboardIcon,
        to: '/'
    },
    { header: 'Funciones' },
    {
        title: 'Recibos',
        icon: ArchiveIcon,
        to: '/receipts'
    }/* ,
    {
        title: 'Inventario',
        icon: BuildingWarehouseIcon,
        to: '/inventory'
    },
    {
        title: 'Salidas',
        icon: TruckDeliveryIcon,
        to: '/salidas'
    } */
];

export default sidebarItem;
