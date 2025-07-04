import os
import requests
from django.http import JsonResponse, HttpResponse, HttpResponseBadRequest
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
import json

@csrf_exempt
@require_POST
def generate_image(request):
    try:
        data = json.loads(request.body)
        model = data.get('model')
        prompt = data.get('prompt')
        image_count = int(data.get('imageCount', 1))
        aspect_ratio = data.get('aspectRatio', '1/1')

        if not model or not prompt:
            return JsonResponse({'error': 'Missing model or prompt'}, status=400)

        api_key = os.environ.get('HUGGINGFACE_API_KEY')
        if not api_key:
            return JsonResponse({'error': 'API key not configured'}, status=500)

        # Optionally, you can validate the model exists here (optional)
        # model_check = requests.get(f'https://huggingface.co/api/models/{model}')
        # if model_check.status_code != 200:
        #     return JsonResponse({'error': f'Model {model} not found'}, status=404)

        payload = {
            'inputs': prompt,
            'parameters': {
                'num_images_per_prompt': image_count,
                # Optionally add width/height based on aspect_ratio
            }
        }
        headers = {
            'Authorization': f'Bearer {api_key}',
            'Content-Type': 'application/json'
        }
        response = requests.post(
            f'https://api-inference.huggingface.co/models/{model}',
            headers=headers,
            data=json.dumps(payload)
        )
        if response.status_code != 200:
            # Log the full error for debugging
            try:
                error_json = response.json()
                error = error_json.get('error', 'API Error')
                detail = error_json
            except Exception:
                error = 'API Error'
                detail = response.text
            # Print error details to server log for debugging
            print(f"HuggingFace API 403/other error: {error} | Detail: {detail} | Model: {model} | Prompt: {prompt}")
            return JsonResponse({'error': error, 'detail': detail, 'status_code': response.status_code}, status=response.status_code)

        # Return image(s) as binary or as a URL (for now, return as binary for single image)
        return HttpResponse(response.content, content_type='image/png')
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
