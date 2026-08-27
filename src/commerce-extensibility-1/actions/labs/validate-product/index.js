const { Core } = require('@adobe/aio-sdk');

async function main (params) {
    const logger = Core.Logger('validate-product', {level: params.LOG_LEVEL || 'info'});
    const startTime = Date.now();

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
            return {
                statusCode: 200,
                body: { op: 'success' },
            };
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
            return {
                statusCode: 200,
                body: {
                    op: 'exception',
                    message,
                },
            };
        }

        logger.info({
            action: 'validate-product',
            message: 'Product validation passed',
            sku: product.sku,
            productName: name,
            durationMs: Date.now() - startTime,
            timestamp: new Date().toISOString(),
        });
        return {
            statusCode: 200,
            body: { op: 'success' },
        };
    } catch (error) {
        logger.error({
            action: 'validate-product',
            message: 'Webhook handler failed',
            error: error.message,
            errorStack: error.stack,
            durationMs: Date.now() - startTime,
            timestamp: new Date().toISOString(),
        });
        return {
            statusCode: 200,
            body: { op: 'success' },
        };
    }
}

exports.main = main;
