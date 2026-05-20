import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { FinancesModule } from './finances/finances.module';
import { ProductsModule } from './products/products.module';
import { EmployeesModule } from './employees/employees.module';
import { ClientsModule } from './clients/clients.module';
import { ProjectsModule } from './projects/projects.module';
import { NotificationsModule } from './notifications/notifications.module';
import { TransactionsModule } from './transactions/transactions.module';
import { ActivitiesModule } from './activities/activities.module';
import { AdminModule } from './admin/admin.module';

// NOTE: AiModule and SubscriptionsModule temporarily excluded (testing if they crash)
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UsersModule,
    FinancesModule,
    ProductsModule,
    EmployeesModule,
    ClientsModule,
    ProjectsModule,
    NotificationsModule,
    TransactionsModule,
    ActivitiesModule,
    AdminModule,
  ],
})
export class AppModule {}
