import { Injectable } from "@nestjs/common";
import { Client } from "pg";
import { exec } from "child_process";
import { promisify } from "util";
import * as path from "path";

const execAsync = promisify(exec);

@Injectable()
export class PgService {
  private readonly pgClient: Client;

  constructor() {
    this.pgClient = new Client({
      connectionString: process.env.DATABASE_URL,
    });
    this.pgClient.connect();
  }

  async exportShapefile(query: string, outputPath: string): Promise<string> {
    const shapefilePath = path.resolve(outputPath);
    const pgsql2shpCommand = `pgsql2shp -f ${shapefilePath} -h ${this.pgClient.host} -p ${this.pgClient.port} -u ${this.pgClient.user} -P ${this.pgClient.password} ${this.pgClient.database} "${query.replace(/"/g, '\\"')}"`;

    try {
      await execAsync(pgsql2shpCommand);
      return shapefilePath;
    } catch (error) {
      throw new Error(`Failed to export shapefile: ${error.message}`);
    }
  }
}
