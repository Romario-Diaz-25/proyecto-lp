/* eslint-disable @typescript-eslint/no-explicit-any */
import { readFileSync } from "fs";
import { env } from "../../config/env/environments";
import { TLang } from "./interfaces/lang.interface";

export class Lang {
  defaultLang: TLang;
  private langData!: Record<string, any>;

  constructor(defaultLang?: TLang) {
    this.defaultLang = defaultLang ?? "es";
    this.loadLangData();
  }

  setDefaultLang(lang?: TLang) {
    if (!lang) this.defaultLang = "es";
    else this.defaultLang = lang;

    this.loadLangData();
  }

  __(templateKey: string, args?: Record<string, any>) {
    if (!args) return this.Lang(templateKey);

    return this.langConverter(this.Lang(templateKey), args);
  }

  private Lang(templateKey: string): string {
    const properties = templateKey.split(".");

    let langValue = this.langData;
    for (const prop of properties) {
      langValue = langValue[prop];
    }
    return String(langValue);
  }

  private langConverter(template: string, args: Record<string, any>) {
    let text: string = template;

    for (const [key, value] of Object.entries(args)) {
      text = text.replaceAll(`{{${key}}}`, value ?? "");
    }

    return text;
  }

  private loadLangData() {
    const filePath = `src/infrastructure/lib/lang/lang_${this.defaultLang}.json`;

    this.langData = JSON.parse(readFileSync(filePath, "utf8"));
  }
}

export const lang = new Lang();
