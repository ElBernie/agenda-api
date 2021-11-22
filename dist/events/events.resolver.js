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
exports.EventsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const events_service_1 = require("./events.service");
const event_model_1 = require("./event.model");
const create_event_input_1 = require("./dto/create-event.input");
const update_event_input_1 = require("./dto/update-event.input");
let EventsResolver = class EventsResolver {
    constructor(eventsService) {
        this.eventsService = eventsService;
    }
    createEvent(createEventInput) {
        return this.eventsService.create(createEventInput);
    }
    findAll() {
        return this.eventsService.findAll();
    }
    findOne(id) {
        return this.eventsService.findOne(id);
    }
    updateEvent(updateEventInput) {
        return this.eventsService.update(updateEventInput.id, updateEventInput);
    }
    removeEvent(id) {
        return this.eventsService.delete(id);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => event_model_1.default),
    __param(0, (0, graphql_1.Args)('createEventInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_event_input_1.CreateEventInput]),
    __metadata("design:returntype", void 0)
], EventsResolver.prototype, "createEvent", null);
__decorate([
    (0, graphql_1.Query)(() => [event_model_1.default], { name: 'events' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EventsResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => event_model_1.default, { name: 'event' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EventsResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => event_model_1.default),
    __param(0, (0, graphql_1.Args)('updateEventInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_event_input_1.UpdateEventInput]),
    __metadata("design:returntype", void 0)
], EventsResolver.prototype, "updateEvent", null);
__decorate([
    (0, graphql_1.Mutation)(() => event_model_1.default),
    __param(0, (0, graphql_1.Args)('id', { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EventsResolver.prototype, "removeEvent", null);
EventsResolver = __decorate([
    (0, graphql_1.Resolver)(() => event_model_1.default),
    __metadata("design:paramtypes", [events_service_1.EventsService])
], EventsResolver);
exports.EventsResolver = EventsResolver;
//# sourceMappingURL=events.resolver.js.map