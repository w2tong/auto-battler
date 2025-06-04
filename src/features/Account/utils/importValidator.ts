import { LocalStorageCharacter } from "@/types/LocalStorage";
import { EquipSlot, AttributeType, ClassName, PetId, armour, ArmourId, hands, HandsId, heads, HeadId, weapons, WeaponId, shields, ShieldId, potions, PotionId, RingId, rings, waists, WaistId, Attributes } from "@wholesome-sisters/auto-battler";
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
                [EquipSlot.Armour]: { type: "string", enum: [...Object.keys(armour) as ArmourId[], null], nullable: true as false },
                [EquipSlot.Hands]: { type: "string", enum: [...Object.keys(hands) as HandsId[], null], nullable: true as false },
                [EquipSlot.Head]: { type: "string", enum: [...Object.keys(heads) as HeadId[], null], nullable: true as false },
                [EquipSlot.MainHand]: { type: "string", enum: [...Object.keys(weapons) as WeaponId[], null], nullable: true as false },
                [EquipSlot.Neck]: { type: "string", enum: [null], nullable: true as false },
                [EquipSlot.OffHand]: { type: "string", enum: [...Object.keys(weapons) as WeaponId[], ...Object.keys(shields) as ShieldId[], null], nullable: true as false },
                [EquipSlot.Potion]: { type: "string", enum: [...Object.keys(potions) as PotionId[], null], nullable: true as false },
                [EquipSlot.Ring1]: { type: "string", enum: [...Object.keys(rings) as RingId[], null], nullable: true as false },
                [EquipSlot.Ring2]: { type: "string", enum: [...Object.keys(rings) as RingId[], null], nullable: true as false },
                [EquipSlot.Waist]: { type: "string", enum: [...Object.keys(waists) as WaistId[], null], nullable: true as false }
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
                [AttributeType.Strength]: { type: "integer", minimum: Attributes.MIN_VALUE },
                [AttributeType.Dexterity]: { type: "integer", minimum: Attributes.MIN_VALUE },
                [AttributeType.Perception]: { type: "integer", minimum: Attributes.MIN_VALUE },
                [AttributeType.Constitution]: { type: "integer", minimum: Attributes.MIN_VALUE },
                [AttributeType.Intelligence]: { type: "integer", minimum: Attributes.MIN_VALUE },
                [AttributeType.Wisdom]: { type: "integer", minimum: Attributes.MIN_VALUE }
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