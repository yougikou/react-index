export interface CategoryType {
  name: string;
  filterStr: string;
  iconStr?: string;
  linkPath?: string;
}

export interface SettingDataType {
  rootUrl: string;
  categories: CategoryType[];
}

const basicSettingKey = "setting-basic";

export function getSettings(): SettingDataType {
  // 初始化保存数据模型，以便合并旧格式数据
  let settingObj: SettingDataType = {
    rootUrl: "",
    categories: [],
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
  let settings = getSettings();
  // index url未设定时，返回空分类 - 不显示菜单
  if (settings.rootUrl.length === 0) {
    let emtpyArr: CategoryType[] = []
    return emtpyArr;
  }

  // 返回分类 - 显示相应菜单
  if (settings.categories.length > 0 ) {
    return settings.categories.map((item: CategoryType, index: any) => {
      // linkPath由name以及项数生成
      let linkPath = { linkPath: "cate_"+ index + "_" + item.name }
      let mergedItem = {...item, ...linkPath};
      return mergedItem
    });
  } else {
    // 返回未分类 - 显示初步内容
    return [{
      name: "uncategoried", 
      filterStr: "",
      iconStr: undefined, 
      linkPath: "/uncategoried"
    }]
  }
}