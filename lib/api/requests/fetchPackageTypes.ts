import { instance } from "../instance";

export interface PackageType {
    id: string;
    name: string;
    length: number;
    width: number;
    height: number;
    weight: number;
}

export interface FetchPackageTypesResponse {
    success: boolean;
    packages: PackageType[];
}

export const fetchPackageTypes = async ({ config }: RequestConfig) =>
    instance.get<FetchPackageTypesResponse>("/delivery/package/types", {
        ...config,
    });
