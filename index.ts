import { existsSync } from "https://deno.land/std@0.205.0/fs/mod.ts";
const [action, ...params] = Deno.args;
const versionFileExists = existsSync("./VERSION"), fileName = "./VERSION";

function init() {
  const version = "1.0.0";
  Deno.writeTextFileSync(fileName, version);
}

switch (action) {
  case "init": {
    init();
    break;
  }
  case "patch": {
    let version: string;
    if (versionFileExists) {
      version = Deno.readTextFileSync(fileName);
      const parts = version.split(".");
      parts[2] = (parseInt(parts[2]) + 1).toString();
      version = parts.join(".");
      Deno.writeTextFileSync(fileName, version);
    } else {
      init();
    }
    break;
  }
  case "minor": {
    let version: string;
    if (versionFileExists) {
      version = Deno.readTextFileSync(fileName);
      const parts = version.split(".");
      parts[2] = "0";
      parts[1] = (parseInt(parts[1]) + 1).toString();
      version = parts.join(".");
      Deno.writeTextFileSync(fileName, version);
    } else {
      init();
    }
    break;
  }
  case "major": {
    let version: string;
    if (versionFileExists) {
      version = Deno.readTextFileSync(fileName);
      const parts = version.split(".");
      parts[2] = "0";
      parts[1] = "0";
      parts[0] = (parseInt(parts[0]) + 1).toString();
      version = parts.join(".");
      Deno.writeTextFileSync(fileName, version);
    } else {
      init();
    }
    break;
  }
  case "set": {
    Deno.writeTextFileSync(fileName, params[0]);
  }
}
