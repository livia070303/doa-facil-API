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
exports.DonationController = void 0;
const common_1 = require("@nestjs/common");
const donation_service_1 = require("../controllers/donation/donation.service");
const create_donation_dto_1 = require("../controllers/donation/dto/create_donation_dto");
const update_donation_dto_1 = require("../controllers/donation/dto/update_donation_dto");
let DonationController = class DonationController {
    constructor(donationService) {
        this.donationService = donationService;
    }
    async createDonation(createDonationDto) {
        const donations = await this.donationService.createDonation(createDonationDto);
        return {
            donations,
            message: 'Doação criada com sucesso',
        };
    }
    async getDonationByCategory(category) {
        const donations = await this.donationService.getDonationByCategory(category);
        return {
            donations,
            message: 'Busca de Doação por categoria realizada com sucesso',
        };
    }
    async searchDonationByCategoryOrName(search) {
        const donations = await this.donationService.searchDonationByCategoryOrName(search);
        return {
            donations,
            message: 'Busca de Doação realizada com sucesso',
        };
    }
    async getDonationRecents(limit) {
        const donations = await this.donationService.getDonationRecents(limit);
        return {
            donations,
            message: 'Busca de Doação realizada com sucesso',
        };
    }
    async getDonationsByDonor(donorId) {
        const donations = await this.donationService.getDonationsByUser(donorId);
        return {
            donations,
            message: 'Busca de doações do doador realizada com sucesso',
        };
    }
    async getDonations() {
        const donations = await this.donationService.getDonations();
        return {
            donations,
            message: 'Lista de doações recuperada com sucesso',
        };
    }
    async getDonationById(id) {
        const donations = await this.donationService.getDonationById(id);
        return {
            donations,
            message: 'Doação recuperada com sucesso',
        };
    }
    async updateDonation(id, updateDonationDto) {
        const updatedDonation = await this.donationService.updateDonationById(id, updateDonationDto);
        return {
            donations: updatedDonation,
            message: 'Doação atualizada com sucesso',
        };
    }
    async updateDonationStatus(id, status) {
        const updatedDonation = await this.donationService.updateDonationStatus(id, status);
        return {
            donations: updatedDonation,
            message: 'Status da doação atualizado com sucesso',
        };
    }
    async deleteDonation(id) {
        await this.donationService.deleteDonationById(id);
        return {
            message: 'Doação excluída com sucesso',
        };
    }
};
exports.DonationController = DonationController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_donation_dto_1.CreateDonationDto]),
    __metadata("design:returntype", Promise)
], DonationController.prototype, "createDonation", null);
__decorate([
    (0, common_1.Get)('category'),
    __param(0, (0, common_1.Query)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DonationController.prototype, "getDonationByCategory", null);
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DonationController.prototype, "searchDonationByCategoryOrName", null);
__decorate([
    (0, common_1.Get)('recents'),
    __param(0, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DonationController.prototype, "getDonationRecents", null);
__decorate([
    (0, common_1.Get)('donor/:donorId'),
    __param(0, (0, common_1.Param)('donorId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DonationController.prototype, "getDonationsByDonor", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DonationController.prototype, "getDonations", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DonationController.prototype, "getDonationById", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_donation_dto_1.UpdateDonationDto]),
    __metadata("design:returntype", Promise)
], DonationController.prototype, "updateDonation", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], DonationController.prototype, "updateDonationStatus", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DonationController.prototype, "deleteDonation", null);
exports.DonationController = DonationController = __decorate([
    (0, common_1.Controller)('donations'),
    __metadata("design:paramtypes", [donation_service_1.DonationService])
], DonationController);
//# sourceMappingURL=donation.controller.js.map