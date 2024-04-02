import readlinesync = require('readline-sync');
import { colors } from './src/util/Cores';
import { Conta } from './src/model/Conta';
import { ContaCorrente } from './src/model/ContaCorrente';
import { ContaPoupanca } from './src/model/ContaPoupanca';
import { ContaController } from './src/controller/ContaController';

export function main() {

    let opcao, numero, agencia, tipo, saldo, limite, aniversario, valor, numeroDestino: number;
    let titular: string;
    const tipoContas = ['Conta Corrente', 'Conta Poupanca']

    let contas: ContaController = new ContaController();

    let cc1: ContaCorrente = new ContaCorrente(contas.gerarNumero(), 456, 1, "Yasmin", 5000, 1000);
    contas.cadastrar(cc1);

    //Teste criando conta
    //let c1: Conta = new Conta(1, 123, 1, "Jhulieny", 1000);
    
    //c1.visualizar();
    // Modificando saldo
        //c1.set_saldo(2000);
    //Recuperando saldo
        //console.log(c1.get_saldo());
    //Testando métodos sacar e depositar
        //c1.sacar(5);
        //c1.visualizar();
        //c1.depositar(5000);
        //c1.visualizar();

    //Testando Classe ContaCorrente, Vendo Heranças e Sobrescrever Métodos
        // const cc1: ContaCorrente = new ContaCorrente(2, 456, 1, "Yasmin", 5000, 1000);
        // cc1.visualizar();
        // cc1.sacar(1000);
        // cc1.visualizar();
        // cc1.depositar(5000);
        // cc1.visualizar();

    //Tentando Classe ContaPoupanca
        // const cp1: ContaPoupanca = new ContaPoupanca(7, 412, 2, "Carlos", 4000, 10);
        // cp1.visualizar();

    // ---Menu Código---
    while (true) {
        console.log(colors.bg.black, colors.fg.yellow,
                    "*****************************************************");
        console.log("                                                     ");
        console.log("                BANCO DO BRAZIL COM Z                ");
        console.log("                                                     ");
        console.log("*****************************************************");
        console.log("                                                     ");
        console.log("            1 - Criar Conta                          ");
        console.log("            2 - Listar todas as Contas               ");
        console.log("            3 - Buscar Conta por Numero              ");
        console.log("            4 - Atualizar Dados da Conta             ");
        console.log("            5 - Apagar Conta                         ");
        console.log("            6 - Sacar                                ");
        console.log("            7 - Depositar                            ");
        console.log("            8 - Transferir Valores entre Contas      ");
        console.log("            9 - Buscar Conta por Titular             ");
        console.log("            0 - Sair                                 ");
        console.log("                                                     ");
        console.log("*****************************************************");
        console.log("                                                     ",
        colors.reset);

        console.log("Entre com a opção desejada: ");
        opcao = readlinesync.questionInt("");

        if (opcao == 0) {
            console.log(colors.fg.greenstrong,
                "\nBanco do Brazil com Z - O seu Futuro começa aqui!");
            sobre();
            console.log(colors.reset, "");
            process.exit(0);
        }

        switch (opcao) {
            case 1:
                console.log(colors.fg.whitestrong, 
                    "\n\nCriar Conta\n\n", colors.reset);
                    console.log("Digite o Número da Agência: ")
                    agencia = readlinesync.questionInt("");
                    console.log("Digite o Nome do Titular: ")
                    titular = readlinesync.question("");
                    console.log("Informe o Tipo da Conta: ")
                    tipo = readlinesync.keyInSelect(tipoContas, "", {cancel: false}) + 1;
                    console.log("Digite o Saldo da Conta: ")
                    saldo = readlinesync.questionFloat("");

                    switch(tipo){
                        case 1:
                            console.log("Digite o limite da conta: ")
                            limite = readlinesync.questionFloat("");
                            contas.cadastrar(
                                new ContaCorrente(contas.gerarNumero(), agencia, tipo, titular, saldo, limite)
                            )
                            break;
                        case 2:
                            console.log("Digite o dia do aniversaro da conta: ")
                            aniversario = readlinesync.questionInt("");
                            contas.cadastrar(
                                new ContaPoupanca(contas.gerarNumero(), agencia, tipo, titular, saldo, aniversario)
                            )
                            break;       
                        }
                    keyPress();
                break;
            case 2:
                console.log(colors.fg.whitestrong, 
                    "\n\nListar todas as Contas\n\n", colors.reset);
                    contas.listarTodas();
                    keyPress();
                break;
            case 3:
                console.log(colors.fg.whitestrong, 
                    "\n\nConsultar dados da Conta - por número\n\n", colors.reset);
                console.log("Digite o Número da Conta: ")
                numero = readlinesync.questionInt("");    
                contas.procurarPorNumero(numero);
                keyPress();
                break;
            case 4:
                console.log(colors.fg.whitestrong, 
                    "\n\nAtualizar dados da Conta\n\n", colors.reset);
                console.log("Digite o Número da Conta: ")
                numero = readlinesync.questionInt("");
                let conta = contas.buscarNoArray(numero);
                if (conta !== null) {
                    console.log("Digite o Número da Agência: ")
                    agencia = readlinesync.questionInt("");
                    console.log("Digite o Nome do Titular: ")
                    titular = readlinesync.question("");
                    tipo = conta.tipo;
                    console.log("Digite o Saldo da Conta: ")
                    saldo = readlinesync.questionFloat("");

                    switch(tipo){
                        case 1:
                            console.log("Digite o limite da conta: ")
                            limite = readlinesync.questionFloat("");
                            contas.atualizar(
                                new ContaCorrente(numero, agencia, tipo, titular, saldo, limite)
                            )
                            break;
                        case 2:
                            console.log("Digite o dia do aniversaro da conta: ")
                            aniversario = readlinesync.questionInt("");
                            contas.atualizar(
                                new ContaPoupanca(numero, agencia, tipo, titular, saldo, aniversario)
                            )
                            break;
                    }
                } else {
                    console.log("A Conta não foi Encontrada!")
                }
                keyPress();
                break;
            case 5:
                console.log(colors.fg.whitestrong, 
                    "\n\nApagar uma Conta\n\n", colors.reset);
                console.log("Digite o Número da Conta: ")
                numero = readlinesync.questionInt("");  
                contas.deletar(numero);                
                keyPress();
                break;
            case 6:
                console.log(colors.fg.whitestrong, 
                    "\n\nSaque\n\n", colors.reset);  
                console.log("Digite o Número da Conta: ")
                numero = readlinesync.questionInt("");
                console.log("Digite o Valor do Saque: ");
                valor = readlinesync.questionFloat("");   
                contas.sacar(numero, valor);             
                keyPress();
                break;
            case 7:
                console.log(colors.fg.whitestrong, 
                    "\n\nDepósito\n\n", colors.reset);  
                console.log("Digite o Número da Conta: ")
                numero = readlinesync.questionInt("");
                console.log("Digite o Valor do Depósito: ");
                valor = readlinesync.questionFloat("");   
                contas.depositar(numero, valor);                  
                keyPress();
                break;
            case 8:
                console.log(colors.fg.whitestrong, 
                    "\n\nTransferência entre Contas\n\n", colors.reset);       
                console.log("Digite o Número da Conta de Origem: ")
                numero = readlinesync.questionInt("");       
                console.log("Digite o Número da Conta de Destino: ")
                numeroDestino = readlinesync.questionInt("");
                console.log("Digite o Valor do Depósito: ");
                valor = readlinesync.questionFloat("");   
                contas.transferir(numero, numeroDestino, valor);         
                keyPress();
                break;
            case 9:
                console.log(colors.fg.whitestrong, 
                    "\n\nConsultar Conta por Titular\n\n", colors.reset);  
                console.log("Digite o Nome do Titular: ")
                titular = readlinesync.question("");
                contas.procurarPorTitular(titular);
                keyPress();
                break;
            default:
                console.log(colors.fg.whitestrong, 
                    "\nOpção Inválida!\n", colors.reset);
                keyPress();
                break;
        }
    }
}

/* Função com os dados da pessoa desenvolvedora */
export function sobre(): void {
    console.log("\n*****************************************************");
    console.log("Projeto Desenvolvido por: Jhulieny B.");
    console.log("Generation Brasil - generation@generation.org");
    console.log("github.com/Conta-Bancaria-Generation-");
    console.log("*****************************************************");
}

function keyPress(): void {
    console.log(colors.reset, "");
    console.log("\nPressione enter para continuar...");
    readlinesync.prompt();
}

main();
