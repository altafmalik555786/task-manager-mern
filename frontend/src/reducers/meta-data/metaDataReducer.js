import { MetaDataActionKey } from "utils/constants";

const initialState = {
  campuses: [
    {
      id: 1,
      code: "ADC",
      name: "Abu Dhabi City Campus",
      nameAr: "مجمع مدينة أبوظبي",
    },
    {
      id: 2,
      code: "DXB",
      name: "Dubai Campus",
      nameAr: "مجمع إمارة دبي",
    },
    {
      id: 3,
      code: "MBZ",
      name: "Mohamed Bin Zayed Campus",
      nameAr: "مجمع مدينة محمد بن زايد",
    },
    {
      id: 4,
      code: "RAK",
      name: "Ras Al Khaimah Campus",
      nameAr: "مجمع إمارة راس الخيمة",
    },
    {
      id: 5,
      code: "SHJ",
      name: "Sharjah Campus",
      nameAr: "مجمع إمارة الشارقة",
    },
    {
      id: 6,
      code: "AAC",
      name: "Al Ain Campus",
      nameAr: "مجمع مدينة العين",
    },
  ],
};

const metaDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case MetaDataActionKey.getStagesMetaData:
      return {
        ...state,
        dropDowns: action.payload.dropDowns,
      };
      break;
    default:
      return state;
  }
};
export default metaDataReducer;
