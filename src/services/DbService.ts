import type { EntityKey, EntityMap } from "@/services/IDbService";
import type { IService, ApiHelper } from "@/services/IService";

export default class DbService implements IService
{
	private readonly _cache: any = {};

	constructor(private readonly geturl: ApiHelper) {}

	public async GetEntity<E extends EntityKey>(key: E): Promise<EntityMap[E][]>
	{
		if(!!this._cache[key]) return this._cache[key] as Promise<EntityMap[E][]>;
		let url = this.geturl(`${key}.json`);
		this._cache[key] = window.$http.get<EntityMap[E][]>(url);
		try
		{
			return await this._cache[key];
		}
		catch
		{
			this._cache[key] = undefined;
			console.error(`Could not load ${url}`)
			return [];
		}
	}
}