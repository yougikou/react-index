export interface CategoryType {
  name: string;
  filterStr: string;
  iconStr?: string;
  linkPath?: string;
  subCategoryStr?: string;
}

export interface FolderTypeSetting {
  path: string;
  type: string;
}

export interface SettingDataType {
  rootUrl: string;
  scriptUrl: string;
  categories: CategoryType[];
  folderSettings: FolderTypeSetting[];
}

const basicSettingKey = "setting-basic";

export function getSettings(): SettingDataType {
  // 初始化保存数据模型，以便合并旧格式数据
  let settingObj: SettingDataType = {
    rootUrl: "",
    scriptUrl: "",
    categories: [],
    folderSettings: []
  };

  // 获取既有设定数据，合并入设定数据模型
  let settingStr = localStorage.getItem(basicSettingKey);

  if (settingStr !== null) {
    settingObj = {...settingObj, ...JSON.parse(settingStr)};
  }

  return settingObj;
}

export function saveSettings(obj: any) : void{
  // 初始化保存数据模型，以便合并旧格式数据
  let settingObj = getSettings();
  // 合并入新设定数据
  let newSettingObj = {...settingObj, ...obj};
  // 保存数据
  localStorage.setItem(basicSettingKey, JSON.stringify(newSettingObj));
}

export function getCategories():CategoryType[] {
  const {rootUrl, categories} = getSettings();
  // index url未设定时，返回空分类 - 不显示菜单
  let tmp: CategoryType[] = []
  if (rootUrl.length === 0) {
    return tmp;
  }

  // 返回分类 - 显示相应菜单
  if (categories.length > 0 ) {
    tmp = [...categories];
    tmp.forEach((item: CategoryType, index: any) => {
      // key, linkPath由name以及项数生成
      item.linkPath = "/cate_"+ index + "_" + item.name;
    });
  }

  if (true) {
    tmp = tmp.concat({
      name: "uncategoried", 
      filterStr: "",
      iconStr: undefined, 
      linkPath: "/uncategoried"
    });
  }

  return tmp;
}