import express from "express";

export abstract class CommonRoutesConfig {
  public app: express.Application;
  private name: string;

  constructor(app: express.Application, name: string) {
    this.app = app;
    this.name = name;
    this.configureRoute();
  }

  getName() {
    return this.name;
  }

  abstract configureRoute(): express.Application;
}
