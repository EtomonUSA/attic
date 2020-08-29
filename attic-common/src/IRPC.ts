import ILocation from "./ILocation";
import {IDriver} from "./IDriver";
import IResolver, {IMountPoint} from "./IResolver";
import IEntity from "./IEntity";


export interface BasicTextSearchQueryOptions {
    skip?: number;
    limit?: number;
    terms: string;
}

export interface BasicTextSearchQueryOptionAdditions {
    count?: boolean;
}

export type BasicTextSearchOptions = BasicTextSearchQueryOptions&BasicTextSearchQueryOptionAdditions;

export interface BasicFindQueryOptions {
    skip?: number;
    limit?: number;
    query?: any;
    sort?: any;
}

export interface BasicFindQueryOptionAdditions {
    count?: boolean;
}

export type BasicFindOptions = BasicFindQueryOptions&BasicFindQueryOptionAdditions;


export default interface IRPC {
    listDrivers(): Promise<string[]>;
    generateId(size?: number): Promise<string>;

    findLocations(query: BasicFindOptions): Promise<ILocation[]|number>;
    findLocation(query: any): Promise<ILocation>;
    searchLocations(query: BasicTextSearchOptions): Promise<ILocation[]|number>;
    createLocation(location: ILocation): Promise<string>;
    updateLocation(id: string, fields: any): Promise<void>
    deleteLocations(query: BasicFindQueryOptions): Promise<void>;
    deleteLocation(query: any): Promise<void>;

    findResolvers(query: BasicFindOptions): Promise<IResolver[]|number>;
    findResolver(query: any): Promise<IResolver>;
    searchResolvers(query: BasicTextSearchOptions): Promise<IResolver[]|number>;
    createResolver(Resolver: IResolver): Promise<string>;
    updateResolver(id: string, fields: any): Promise<void>
    deleteResolvers(query: BasicFindQueryOptions): Promise<void>;
    deleteResolver(query: any): Promise<void>;
    resolveLocation(location: ILocation): Promise<ILocation>;
    resolve(location: ILocation|string, id?: string): Promise<ILocation>;
    listResolverTypes(): Promise<string[]>;

    findEntities(query: BasicFindOptions): Promise<IEntity[]|number>;
    findEntity(query: any): Promise<IEntity>;
    searchEntities(query: BasicTextSearchOptions): Promise<IEntity[]|number>;
    createEntity(Entity: IEntity): Promise<string>;
    updateEntity(id: string, fields: any): Promise<void>
    deleteEntities(query: BasicFindQueryOptions): Promise<void>;
    deleteEntity(query: any): Promise<void>;
    listEntityTypes(): Promise<string[]>;

    getNextResolverPriority(mountPoint: IMountPoint): Promise<number>;
}