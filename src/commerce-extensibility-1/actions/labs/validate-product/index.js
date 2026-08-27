const { Core } = require('@adobe/aio-sdk');
const { successResponse, errorResponse } = require('../../utils');

async function main (params) {
    const logger = Core.Logger('validate-product', {level: params.LOG_LEVEL || 'info'});
    const startTime = Date.now();
    const correlationId = params['x-correlation-id'] || require('uuid').v4();

    logger.info({
        action: 'validate-product',
        message: 'Webhook received',
        timestamp: new Date().toISOString(),
    });

    try {
        const product = params.product || params.data?.product;

        if (!product) {
            logger.warn({
                action: 'validate-product',
                message: 'No product data in webhook payload',
                timestamp: new Date().toISOString(),
            });
            return successResponse({ op: 'success' }, correlationId);
        }

        const name = product.name != null ? String(product.name) : '';
        if (name.toLowerCase().includes('invalid')) {
            const message =
                'Product validation failed: product name must not contain the word "invalid".';
            logger.warn({
                action: 'validate-product',
                message: 'Product validation failed',
                sku: product.sku,
                productName: name,
                reason: 'name contains "invalid"',
                timestamp: new Date().toISOString(),
            });
            return successResponse({
                op: 'exception',
                message,
            }, correlationId);
        }

        logger.info({
            action: 'validate-product',
            message: 'Product validation passed',
            sku: product.sku,
            productName: name,
            durationMs: Date.now() - startTime,
            timestamp: new Date().toISOString(),
        });
        return successResponse({ op: 'success' }, correlationId);
    } catch (error) {
        logger.error({
            action: 'validate-product',
            message: 'Webhook handler failed',
            error: error.message,
            errorStack: error.stack,
            durationMs: Date.now() - startTime,
            timestamp: new Date().toISOString(),
        });
        return successResponse({ op: 'success' }, correlationId);
    }
}

exports.main = main;
