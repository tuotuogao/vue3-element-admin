import { SizeEnum } from "./src/enums/SizeEnum";

import { LayoutEnum } from "./src/enums/LayoutEnum";
import { ThemeEnum } from "./src/enums/ThemeEnum";
import { LanguageEnum } from "./src/enums/LanguageEnum";

const { pkg } = __APP_INFO__;

const mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");

const defaultSettings: AppSettings = {
  title: pkg.name,
  version: pkg.version,
  showSettings: true,
  tagsView: true,
  fixedHeader: true,
  sidebarLogo: true,
  layout: LayoutEnum.LEFT,
  theme: mediaQueryList.matches ? ThemeEnum.DARK : ThemeEnum.LIGHT,
  size: SizeEnum.DEFAULT,
  language: LanguageEnum.ZH_CN,
  themeColor: "#4080FF",
  watermarkEnabled: false,
  watermarkContent: pkg.name,
};

export default defaultSettings;
