import { LocalStorageCharacter } from "@/types/LocalStorage";
import { EquipSlot, AttributeType, ClassName, PetId } from "@wholesome-sisters/auto-battler";
import Ajv, { JSONSchemaType } from "ajv";

const characterSchema: JSONSchemaType<LocalStorageCharacter> = {
    type: "object",
    properties: {
        name: { type: "string" },
        class: { type: "string", enum: Object.values(ClassName) },
        level: { type: "integer", minimum: 1, maximum: 20 },
        exp: { type: "integer" },
        equipment: {
            type: "object",
            properties: {
                [EquipSlot.Armour]: { type: "string", nullable: true as false },
                [EquipSlot.Hands]: { type: "string", nullable: true as false },
                [EquipSlot.Head]: { type: "string", nullable: true as false },
                [EquipSlot.MainHand]: { type: "string", nullable: true as false },
                [EquipSlot.Neck]: { type: "string", nullable: true as false },
                [EquipSlot.OffHand]: { type: "string", nullable: true as false },
                [EquipSlot.Potion]: { type: "string", nullable: true as false },
                [EquipSlot.Ring1]: { type: "string", nullable: true as false },
                [EquipSlot.Ring2]: { type: "string", nullable: true as false },
                [EquipSlot.Waist]: { type: "string", nullable: true as false }
            },
            required: [
                EquipSlot.Armour,
                EquipSlot.Hands,
                EquipSlot.Head,
                EquipSlot.MainHand,
                EquipSlot.Neck,
                EquipSlot.OffHand,
                EquipSlot.Potion,
                EquipSlot.Ring1,
                EquipSlot.Ring2,
                EquipSlot.Waist
            ],
            additionalProperties: false
        },
        attributes: {
            type: "object",
            properties: {
                [AttributeType.Strength]: { type: "integer" },
                [AttributeType.Dexterity]: { type: "integer" },
                [AttributeType.Perception]: { type: "integer" },
                [AttributeType.Constitution]: { type: "integer" },
                [AttributeType.Intelligence]: { type: "integer" },
                [AttributeType.Wisdom]: { type: "integer" }
            },
            required: [
                AttributeType.Strength,
                AttributeType.Dexterity,
                AttributeType.Perception,
                AttributeType.Constitution,
                AttributeType.Intelligence,
                AttributeType.Wisdom
            ],
            additionalProperties: false
        },
        pet: { type: "string", enum: [...Object.values(PetId), null], nullable: true as false },
        talents: {
            type: "object",
            additionalProperties: { type: "integer" },
            required: []
        }
    },
    required: [
        "name",
        "class",
        "level",
        "exp",
        "equipment",
        "attributes",
        "pet",
        "talents"
    ],
    additionalProperties: false
};

const ajv = new Ajv({ allErrors: true });
const validateCharacter = ajv.compile<LocalStorageCharacter>(characterSchema);

export { validateCharacter };