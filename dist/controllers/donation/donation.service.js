"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DonationService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const donation_schema_1 = require("../../schemas/donation.schema");
const user_schema_1 = require("../../schemas/user.schema");
let DonationService = class DonationService {
    constructor(donationModel, userModel) {
        this.donationModel = donationModel;
        this.userModel = userModel;
    }
    async createDonation(createDonationDto) {
        try {
            const newDonation = new this.donationModel(createDonationDto);
            const user = await this.userModel.findById(createDonationDto.donor);
            if (!user) {
                throw new common_1.NotFoundException(`Donor inválido, precisa ser um ID de usuário valido`);
            }
            return newDonation.save();
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Erro ao criar a doação: ' + error.message);
        }
    }
    async getDonations() {
        try {
            return this.donationModel.find().populate('donor').exec();
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Erro ao buscar doações: ' + error.message);
        }
    }
    async getDonationRecents(limit) {
        try {
            const query = this.donationModel
                .find()
                .sort({ createdAt: -1 })
                .populate('donor');
            if (limit && limit > 0) {
                query.limit(limit);
            }
            return query.exec();
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Erro ao buscar doações: ' + error.message);
        }
    }
    async getDonationByCategory(category) {
        try {
            const donation = await this.donationModel.find({ category: category }).populate('donor').exec();
            if (!donation) {
                throw new common_1.NotFoundException(`Nenhum item com a categoria :"${category}" foi encontrada`);
            }
            return donation;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Erro ao buscar doações por categoria: ' + error.message);
        }
    }
    async searchDonationByCategoryOrName(search) {
        try {
            const searchCriteria = {
                $or: [
                    { productName: { $regex: search, $options: 'i' } },
                    { category: { $regex: search, $options: 'i' } },
                ],
            };
            const donation = await this.donationModel.find(searchCriteria).populate('donor').exec();
            if (!donation) {
                throw new common_1.NotFoundException(`Nenhum item foi encontrada na busca`);
            }
            return donation;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Erro ao buscar doações: ' + error.message);
        }
    }
    async getDonationById(id) {
        try {
            const donation = await this.donationModel.findById(id).populate('donor').populate('receiver').exec();
            if (!donation) {
                throw new common_1.NotFoundException(`Doação com ID "${id}" não encontrada`);
            }
            return donation;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Erro ao buscar a doação: ' + error.message);
        }
    }
    async updateDonationById(id, updateDonationDto) {
        try {
            const updatedDonation = await this.donationModel
                .findByIdAndUpdate(id, updateDonationDto, { new: true })
                .exec();
            if (!updatedDonation) {
                throw new common_1.NotFoundException(`Doação com ID "${id}" não encontrada`);
            }
            return updatedDonation;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Erro ao atualizar a doação: ' + error.message);
        }
    }
    async updateDonationStatus(id, status) {
        try {
            const donation = await this.donationModel.findById(id);
            if (donation) {
                donation.status = status;
                donation.save();
                return donation;
            }
            else {
                throw new common_1.BadRequestException('Doação não encontrada');
            }
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Erro ao atualizar o status da doação: ' + error.message);
        }
    }
    async deleteDonationById(id) {
        try {
            const result = await this.donationModel.findByIdAndDelete(id).exec();
            if (!result) {
                throw new common_1.NotFoundException(`Doação com ID "${id}" não encontrada`);
            }
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Erro ao deletar a doação: ' + error.message);
        }
    }
};
exports.DonationService = DonationService;
exports.DonationService = DonationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(donation_schema_1.Donation.name, 'main')),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name, 'main')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], DonationService);
//# sourceMappingURL=donation.service.js.map