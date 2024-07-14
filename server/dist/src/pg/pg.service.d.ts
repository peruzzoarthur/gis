export declare class PgService {
    private readonly pgClient;
    constructor();
    exportShapefile(query: string, outputPath: string): Promise<string>;
}
