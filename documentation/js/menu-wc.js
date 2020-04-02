'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">flip-shop documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AppModule-b6bc207c698594c60cbd608b6b84f07d"' : 'data-target="#xs-controllers-links-module-AppModule-b6bc207c698594c60cbd608b6b84f07d"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-b6bc207c698594c60cbd608b6b84f07d"' :
                                            'id="xs-controllers-links-module-AppModule-b6bc207c698594c60cbd608b6b84f07d"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-b6bc207c698594c60cbd608b6b84f07d"' : 'data-target="#xs-injectables-links-module-AppModule-b6bc207c698594c60cbd608b6b84f07d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-b6bc207c698594c60cbd608b6b84f07d"' :
                                        'id="xs-injectables-links-module-AppModule-b6bc207c698594c60cbd608b6b84f07d"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProductsModule.html" data-type="entity-link">ProductsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-ProductsModule-dd243789044d69f32e78bad0e76cca20"' : 'data-target="#xs-controllers-links-module-ProductsModule-dd243789044d69f32e78bad0e76cca20"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ProductsModule-dd243789044d69f32e78bad0e76cca20"' :
                                            'id="xs-controllers-links-module-ProductsModule-dd243789044d69f32e78bad0e76cca20"' }>
                                            <li class="link">
                                                <a href="controllers/ProductsController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProductsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ProductsModule-dd243789044d69f32e78bad0e76cca20"' : 'data-target="#xs-injectables-links-module-ProductsModule-dd243789044d69f32e78bad0e76cca20"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ProductsModule-dd243789044d69f32e78bad0e76cca20"' :
                                        'id="xs-injectables-links-module-ProductsModule-dd243789044d69f32e78bad0e76cca20"' }>
                                        <li class="link">
                                            <a href="injectables/ProductsService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ProductsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ShoppingCartModule.html" data-type="entity-link">ShoppingCartModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-ShoppingCartModule-6e7497edbd89cc8971214393f73804e1"' : 'data-target="#xs-controllers-links-module-ShoppingCartModule-6e7497edbd89cc8971214393f73804e1"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ShoppingCartModule-6e7497edbd89cc8971214393f73804e1"' :
                                            'id="xs-controllers-links-module-ShoppingCartModule-6e7497edbd89cc8971214393f73804e1"' }>
                                            <li class="link">
                                                <a href="controllers/ShoppingCartController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ShoppingCartController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ShoppingCartModule-6e7497edbd89cc8971214393f73804e1"' : 'data-target="#xs-injectables-links-module-ShoppingCartModule-6e7497edbd89cc8971214393f73804e1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ShoppingCartModule-6e7497edbd89cc8971214393f73804e1"' :
                                        'id="xs-injectables-links-module-ShoppingCartModule-6e7497edbd89cc8971214393f73804e1"' }>
                                        <li class="link">
                                            <a href="injectables/CurrenciesService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>CurrenciesService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ShoppingCartService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ShoppingCartService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/ProductDto.html" data-type="entity-link">ProductDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ShoppingCartDto.html" data-type="entity-link">ShoppingCartDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ShoppingCartUpdateDto.html" data-type="entity-link">ShoppingCartUpdateDto</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/DetailedProductListItem.html" data-type="entity-link">DetailedProductListItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ExternalExchangeRates.html" data-type="entity-link">ExternalExchangeRates</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OrderCheckoutDto.html" data-type="entity-link">OrderCheckoutDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ProductPriceDto.html" data-type="entity-link">ProductPriceDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ProductPriceWithTotal.html" data-type="entity-link">ProductPriceWithTotal</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ShoppingCartProductListItem.html" data-type="entity-link">ShoppingCartProductListItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TotalPrice.html" data-type="entity-link">TotalPrice</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});