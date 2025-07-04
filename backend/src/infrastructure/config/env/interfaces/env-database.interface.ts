export interface IEnvDB {
  mysql: IEnvDBMysqlConfiguration;
}

type TDBPool = {
  min: number;
  max: number;
};

interface IEnvDBMysqlConfiguration {
  port?: string;
  host?: string;
  user: string;
  pass: string;
  name?: string;
  pool: TDBPool;
  time?: string;
  dialect: string;
}
