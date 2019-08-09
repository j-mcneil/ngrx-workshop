import { ItemsService } from './items.service';
import { DashboardFacadeService } from './dashboard.facade.service';
 
export const services: any[] = [ItemsService, DashboardFacadeService];

export * from './items.service';
export * from './dashboard.facade.service';