interface SupabaseError {
   cause?: unknown;
   code: string;
   details: string;
   hint: string;
   message: string;
   name: string;
   stack?: string;
}

export interface SupabaseStorage {
   id: string;
   path: string;
   fullPath: string;
}

interface SupabaseStorageError {
   cause?: unknown;
   message: string;
   name: string;
   stack?: string;
}

export interface SupabaseResponse<T> {
   data: T | null;
   error: SupabaseError | null;
}

export interface SupabaseStorageResponse<T> {
   data: T | null;
   error: SupabaseStorageError | null;
}

export type ObjectT = { [key: string]: any };

export type CrudAction = 'get' | 'new' | 'update' | 'remove';

export interface DashboardCounts {
   totalProducts: number;
   totalIncomes: number;
   totalExpenses: number;
   totalRevenue: number;
   totalSales: number;
   averagePrice: number;
   unStockProducs: number;
}

export interface DashboardFilters {
   period: PeriodFilter;
   date?: string;
}

export type PeriodFilter = 'day' | 'week' | 'month' | 'year'; 