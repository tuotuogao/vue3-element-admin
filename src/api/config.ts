
import request from "@/utils/request";

//定义基础 URL ，使用环境变量或配置文件来动态管理 API 基础地址。
const CONFIG_BASE_URL = "/api/v1/config"
// 1.首先就是定义接口，完了之后就是导出接口，供其他地方调用。接着就是对请求体的类型
// 2.定义接口，接口的名称一般是以API结尾，比如ConfigAPI，PageQuery，ConfigPageVO等。
// 3.接口的定义一般包含请求方式，请求地址，请求参数，响应数据类型。
// 4.请求方式一般是get、post、put、delete等，请求地址一般是接口的相对路径，请求参数一般是接口的查询参数，响应数据类型一般是接口返回的数据类型。
// 7.接口的实现一般是异步函数，请求方式一般是使用axios库来实现。

const ConfigForm = ref()
// 定义接口
const ConfigAPI = {
    getPage(queryParams?: ConfigPageQuery) {
        // 请求体的类型第一个类型参数any，表示请求的参数类型可以是any
        // 响应数据的类型，第二个参数类型PageResult<ConfigPageVO[]>表示请求成功后，返回的数据类型
        // pageResult是一个泛型类型，通常表示分页的结构，他可能包含总记录数，当前的数据等信息，configpagevo【】表示请求返回的实际数据是一个数据，数组中的每一个元素都是configpage类型的对象
        return request<any, PageResult<ConfigPageVO[]>>({
            method: "get",
            url: `${CONFIG_BASE_URL}/page`,
            params: queryParams,

        });
    },
  /**
   * 获取系统配置表单数据
   *
   * @param id ConfigID
   * @returns Config表单数据
   */
  getFormData(id: number) {
    return request<any, ConfigForm>({
      url: `${CONFIG_BASE_URL}/${id}/form`,
      method: "get",
    });
  },


    }
    export default ConfigAPI;
    // 继承了pageQuery的类型，使用interface可以继承，使用type的话就不可以
    export interface ConfigPageQuery extends PageQuery{
        keywords?: string;

}
export interface ConfigPageVO {
    /**
         * 配置键
         */
    configKey: string;
    /**
     * 配置名称
     */
    configName: string;
    /**
     * 配置值
     */
    configValue: string;
    /**
     * 主键
     */
    id?: number;
    /**
     * 描述、备注
     */
    remark?: string;
    [property: string]: any;
}
/**
 * ConfigForm，系统配置Form实体
 */
export interface ConfigForm {
    /**
     * 配置键
     */
    configKey: string;
    /**
     * 配置名称
     */
    configName: string;
    /**
     * 配置值
     */
    configValue: string;
    /**
     * 主键
     */
    id?: number;
    /**
     * 描述、备注
     */
    remark?: string;
    [property: string]: any;
}