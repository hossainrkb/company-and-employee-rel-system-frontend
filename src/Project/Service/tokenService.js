export function raiseAdminToken(){
    return localStorage.getItem("accessTokenAdmin");
}
export function raiseCompanyToken(){
    return localStorage.getItem("accessTokenCompany");
}
export function raiseEmployeeToken(){
    return localStorage.getItem("accessTokenEmployee");
}
