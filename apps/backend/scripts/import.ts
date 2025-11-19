import { ImportService } from '../src/services/importService';

async function main() {
    const service = new ImportService();

    console.log("Iniciando importação de continentes...");

    await service.importarContinentes();
    await service.importarPaises();
    await service.importarCidades();

    console.log("Importação concluída com sucesso!");
}

main()
    .catch(err => console.error(err))
    .finally(() => process.exit());