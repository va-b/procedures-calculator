import type { ICalculatorService } from "@/services/ICalculatorService";
import type { IDbService } from "@/services/IDbService";
import type Vue from "vue";

export {};

declare global {
	interface Window {
		$service: ICalculatorService;
		$db: IDbService;
		$http: IHttpClient;
		$vm: Vue;
	}

	interface IHttpClient
	{
		get<T>( url: string ): Promise<T>;

		post<T>( url: string, data: string | FormData ): Promise<T>;

		put<T>( url: string, data: string ): Promise<T>;

		patch<T>( url: string, data: string ): Promise<T>;

		delete<T>( url: string ): Promise<T>;
	}
}