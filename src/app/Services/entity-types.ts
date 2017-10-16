class EntityTypeItem {
    constructor(public Name: string, public DisplayName: string) { }
}

export default {
    CATEGORIES: new EntityTypeItem('categories', 'Категории'),
    PARAMETERS: new EntityTypeItem('parameters', 'Параметры'),
    VALUE_TYPES: new EntityTypeItem('valueTypes', 'Типы данных'),
    PRODUCTS: new EntityTypeItem('products', 'Товары'),
    PRODUCT_PARAMETER: new EntityTypeItem('productParameters', 'Параметры продукта'),
    SLIDES: new EntityTypeItem('slides', 'Слайды главной страницы'),
    USERS: new EntityTypeItem('users', 'Пользователи'),
    CONTACT_INFORMATION: new EntityTypeItem('contactInformation', 'Контактная информация')
}

