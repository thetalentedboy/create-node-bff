
interface OrganizationInfo {
    ID?: number;
    Name?: string;
}

interface UserCompanyItem {
    ID?: number;
    Name?: string;
    Available?: boolean;
}

export interface UserInfo {
    ModuleList?: number[];
    AuthList?: number[];
    RouteList?: string[];
    RoleList?: string[];
    RoleIDList?: number[];
    DepartmentList?: string[];
    DepartmentIDList?: number[];
    DepartmentInfoList?: OrganizationInfo[];
    ManageDepartmentList?: OrganizationInfo[];
    ClientID?: string;
    ID?: number;
    User?: string;
    DingUserID?: string;
    Name?: string;
    Email?: string;
    Disabled?: boolean;
    Key?: string;
    CompanyID?: number;
    BlocID?: number;
    DepartmentIds?: number[];
    CompanyIds?: number[];
    CompanyList?: UserCompanyItem[];
    Perms?: string[];
}