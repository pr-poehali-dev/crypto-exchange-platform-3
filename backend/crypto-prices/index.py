import json
import urllib.request
import urllib.error
from typing import Dict, Any, List

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Получение актуальных цен криптовалют из CoinGecko API
    Args: event - запрос с httpMethod GET
          context - контекст выполнения функции
    Returns: JSON с ценами и изменениями криптовалют
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    crypto_ids = 'bitcoin,ethereum,tether,binancecoin,solana,cardano'
    url = f'https://api.coingecko.com/api/v3/simple/price?ids={crypto_ids}&vs_currencies=usd&include_24hr_change=true'
    
    try:
        req = urllib.request.Request(url)
        req.add_header('User-Agent', 'Mozilla/5.0')
        
        with urllib.request.urlopen(req, timeout=10) as response:
            data = json.loads(response.read().decode())
        
        crypto_map = {
            'bitcoin': {'name': 'Bitcoin', 'symbol': 'BTC', 'icon': '₿'},
            'ethereum': {'name': 'Ethereum', 'symbol': 'ETH', 'icon': 'Ξ'},
            'tether': {'name': 'Tether', 'symbol': 'USDT', 'icon': '₮'},
            'binancecoin': {'name': 'Binance Coin', 'symbol': 'BNB', 'icon': '🔶'},
            'solana': {'name': 'Solana', 'symbol': 'SOL', 'icon': '◎'},
            'cardano': {'name': 'Cardano', 'symbol': 'ADA', 'icon': '🔷'}
        }
        
        result: List[Dict[str, Any]] = []
        for crypto_id, crypto_data in data.items():
            if crypto_id in crypto_map:
                info = crypto_map[crypto_id]
                result.append({
                    'name': info['name'],
                    'symbol': info['symbol'],
                    'icon': info['icon'],
                    'price': crypto_data.get('usd', 0),
                    'change24h': crypto_data.get('usd_24h_change', 0)
                })
        
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Cache-Control': 'public, max-age=30'
            },
            'body': json.dumps({'data': result, 'timestamp': context.request_id}),
            'isBase64Encoded': False
        }
        
    except urllib.error.URLError as e:
        return {
            'statusCode': 503,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            'body': json.dumps({'error': 'Failed to fetch crypto prices', 'details': str(e)}),
            'isBase64Encoded': False
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            'body': json.dumps({'error': 'Internal server error', 'details': str(e)}),
            'isBase64Encoded': False
        }
