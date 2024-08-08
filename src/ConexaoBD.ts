import { PrismaClient, Prisma } from '@prisma/client';

class ClienteService {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async createCliente(nome: string, cpf: string, email: string, senha: string, checkin: Date, checkout: Date) {
        const cliente: Prisma.clienteCreateInput = {
            nome,
            cpf,
            email,
            senha,
            checkin,
            checkout
        };

        try {
            const createCliente = await this.prisma.cliente.create({ data: cliente });
            console.log('Created cliente:', createCliente);
        } catch (error) {
            console.error('Error creating cliente:', error);
        } finally {
            await this.prisma.$disconnect();
        }
    }

    async deleteCliente(id: number) {
        try {
            const deleteCliente = await this.prisma.cliente.delete({ where: { id } });
            console.log('Deleted cliente:', deleteCliente);
        } catch (error) {
            console.error('Error deleting cliente:', error);
        } finally {
            await this.prisma.$disconnect();
        }
    }

    async findClientesByName(nome: string) {
        try {
            const users = await this.prisma.cliente.findMany({
                where: {
                    nome: {
                        contains: nome,
                    }
                }
            });
            console.table(users);
        } catch (error) {
            console.error('Error finding clientes:', error);
        } finally {
            await this.prisma.$disconnect();
        }
    }
}

// // Exemplo de uso da classe ClienteService
// const clienteService = new ClienteService();

// // Criação de um cliente
// // const nome = 'Renan Cupixa';
// // const cpf = '056.325.930-21';
// // const email = 'renanbernardo311@gmail.com';
// // const senha = 'renanlindo';
// // const checkin = new Date('2024-07-10T00:00:00.000Z');
// // const checkout = new Date('2024-07-11T00:00:00.000Z');

// // clienteService.createCliente(nome, cpf, email, senha, checkin, checkout);

// // // Deleção de um cliente
// // const idToDelete = 1;
// // clienteService.deleteCliente(idToDelete);

// // Busca de clientes pelo nome
// const nomeParaBuscar = 'Renan Cupixa';
// clienteService.findClientesByName(nomeParaBuscar);
