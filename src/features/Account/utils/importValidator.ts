import { LocalStorageCharacter } from "@/types/LocalStorage";
import { EquipSlot, AttributeType, ClassName, PetId } from "@wholesome-sisters/auto-battler";
import Ajv, { JTDSchemaType } from "ajv/dist/jtd";

const characterSchema: JTDSchemaType<LocalStorageCharacter> = {
    properties: {
        name: { type: "string" },
        class: { enum: Object.values(ClassName), nullable: false }, // change to ClassName
        level: { type: "int32" }, // Change to LevelRange
        exp: { type: "int32" }, // Change to LevelRange
        equipment: {
            properties: {
                [EquipSlot.Armour]: { type: "string", nullable: true },
                [EquipSlot.Hands]: { type: "string", nullable: true },
                [EquipSlot.Head]: { type: "string", nullable: true },
                [EquipSlot.MainHand]: { type: "string", nullable: true },
                [EquipSlot.Neck]: { type: "string", nullable: true },
                [EquipSlot.OffHand]: { type: "string", nullable: true },
                [EquipSlot.Potion]: { type: "string", nullable: true },
                [EquipSlot.Ring1]: { type: "string", nullable: true },
                [EquipSlot.Ring2]: { type: "string", nullable: true },
                [EquipSlot.Waist]: { type: "string", nullable: true }
            },
            optionalProperties: {},
        },
        attributes: {
            properties: {
                [AttributeType.Strength]: { type: "int32" },
                [AttributeType.Dexterity]: { type: "int32" },
                [AttributeType.Perception]: { type: "int32" },
                [AttributeType.Constitution]: { type: "int32" },
                [AttributeType.Intelligence]: { type: "int32" },
                [AttributeType.Wisdom]: { type: "int32" }
            },
            optionalProperties: {},
        },
        pet: { enum: Object.values(PetId), nullable: true }, // change to PetId
        talents: { values: { type: "int32" } } // empty array until talents implemented
    },
    optionalProperties: {},
    additionalProperties: false
};
const ajv = new Ajv({ allErrors: true });

// const validateCharacter = ajv.compile<LocalStorageCharacter>(characterSchema);
// const serializeCharacter = ajv.compileSerializer<LocalStorageCharacter>(characterSchema);
const parseCharacter = ajv.compileParser<LocalStorageCharacter>(characterSchema);

ajv.addFormat("levelRange", {
    type: 'number',
    validate: (level: number) => level >= 1 && level <= 20
});
ajv.addSchema(characterSchema);

export { parseCharacter };