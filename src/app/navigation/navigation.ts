import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id: 'applications',
        title: 'Applications',
        translate: 'NAV.APPLICATIONS',
        type: 'group',
        icon: 'apps',
        children: [
            {
                id: 'users',
                title: 'Usuarios',
                type: 'collapsable',
                icon: 'dashboard',
                children: [
                    {
                        id: 'analytics',
                        title: 'Bancos',
                        type: 'item',
                        url: '/banks/'
                    },
                    {
                        id: 'commissions',
                        title: 'Gestión de comisiones',
                        translate: 'NAV.COMMISSION',
                        type: 'item',
                        url: '/banks/commission/'
                    }
                ]
            },
            {
                id: 'banks',
                title: 'Bancos',
                translate: 'NAV.BANKS',
                type: 'collapsable',
                icon: 'dashboard',
                children: [
                    {
                        id: 'analytics',
                        title: 'Bancos',
                        type: 'item',
                        url: '/banks/'
                    },
                    {
                        id: 'commissions',
                        title: 'Gestión de comisiones',
                        translate: 'NAV.COMMISSION',
                        type: 'item',
                        url: '/banks/commission/'
                    }
                ]
            },
            {
                id: 'operations',
                title: 'Operaciones',
                type: 'item',
                icon: 'today',
                url: '/operations',
                badge: {
                    title: '25',
                    translate: 'NAV.MAIL.BADGE',
                    bg: '#F44336',
                    fg: '#FFFFFF'
                }
            },
        ]
    }
]
