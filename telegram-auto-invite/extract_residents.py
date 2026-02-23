"""
Extract Telegram usernames from drag2battery-bot's collect_residents.py
and resolve them to User IDs using Telegram API
"""
import json
import asyncio
import sys
import io
from telethon import TelegramClient
import config

# Fix encoding for Windows console output
if sys.platform == 'win32':
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')

# All Telegram usernames from collect_residents.py
RESIDENT_USERNAMES = [
    "@rinaaukr",
    "@mariasydorenko",
    "@Shishkova_lyuda",
    "@berezovskaya08",
    "@PorscheDesig",
    "@Pepperoner",
    "@Vishenka11",
    "@furagirl20",
    "@slavayushkov",
    "@OSinch",
    "@lizazakharchenko",
    "@Katya131184",
    "@SvitlanaShka",
    "@yulya_u2024",
    "@Dbimkova",
    "@nastyahur",
    "@liubovbelissimo",
    "@arnold_2719",
    "@ydziuba",
    "@bogolubov_sax",
    "@Vasja_pupkin12",
    "@hanna_hanno",
    "@SafronovAndrii",
    "@Aleks_andra_Matsenko",
    "@Lidiia_Mat",
    "@lenochkaU2023",
    "@k_nassttii",
    "@vboiarchuk",
    "@mkremen555",
    "@andrw23",
    "@shprotodav",
    "@sova8844",
    "@pizhevskyi",
    "@yuliatuley",
    "@Andrey_S2",
    "@Qwrt526",
    "@T_tati13",
    "@Frau_GAVANA",
    "@mariabndr",
    "@krrolly",
    "@svit_mo",
    "@Juliya_Leus",
    "@yurafem",
    "@ChystiakovaAlina",
    "@Maksym_Donich",
    "@Igorrrz",
    "@popovychsergii",
    "@AESolodchuk",
    "@nazarlutsenko",
    "@shugay_julia",
    "@andrii_stanchev",
    "@your_liii",
    "@dedaoleh",
    "@andrii_trainer",
    "@VolodjaR",
    "@georgiimk",
    "@annarubann",
    "@yherashchenko",
    "@zheka_doneckiy",
    "@Anna_oikos",
    "@KovalchukAndrew",
    "@zp_eugene",
    "@QwRtYu1234",
    "@j_ganush",
    "@antoninazhemera",
    "@Masha_V4",
    "@jklyots",
    "@IrynaLko",
    "@kalinanatulya",
    "@margo_klk",
    "@buchynskyi1",
    "@shohn_slime",
    "@k1l2b",
    "@krasprod",  # The one user mentioned
    "@ChaikaRoman",
    "@AlexanderTatt",
    "@kassiopeya1509",
    "@GLM2509",
    "@krailuk",
    "@Dftg18",
    "@LesiaCherniak",
    "@protsenkovaleriyaa",
    "@Alena_Knapp",
    "@KovalSergey15",
    "@Smolievska",
    "@dariayrvn",
    "@Den_24barber",
    "@aylirne",
    "@IraPryshedko",
    "@aylin2772",
    "@olena_iastremska",
    "@Kateryna_Danish",
    "@V_Ozhykhovskyi",
    "@dashakomashka",
    "@anastaciyy",
    "@volodymyr_korobov",
    "@dmitriyfortina",
]

async def extract_residents():
    """Get User IDs for all resident usernames"""
    client = TelegramClient(config.SESSION_FILE, config.API_ID, config.API_HASH)
    
    try:
        await client.start(phone=config.PHONE, password=config.PASSWORD_2FA)
        print("✅ Successfully connected to Telegram\n")
        
        residents = []
        not_found = []
        
        print(f"🔍 Resolving {len(RESIDENT_USERNAMES)} usernames...\n")
        
        for username in RESIDENT_USERNAMES:
            try:
                # Remove @ if present
                clean_username = username.replace('@', '')
                
                # Get user info
                user = await client.get_entity(clean_username)
                
                resident_info = {
                    'id': user.id,
                    'username': user.username if user.username else '',
                    'first_name': user.first_name if user.first_name else '',
                    'last_name': user.last_name if user.last_name else '',
                    'phone': ''  # Unknown
                }
                
                residents.append(resident_info)
                
                display_name = f"@{user.username}" if user.username else f"{user.first_name} {user.last_name}"
                print(f"  ✓ {display_name}")
                
                # Small delay to avoid rate limits
                await asyncio.sleep(0.5)
                
            except Exception as e:
                print(f"  ⚠️ {username} - Not found or error: {str(e)[:50]}")
                not_found.append(username)
        
        # Save to JSON file
        output_file = 'resident_users.json'
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(residents, f, ensure_ascii=False, indent=2)
        
        print(f"\n{'='*50}")
        print(f"✅ Successfully resolved {len(residents)} usernames")
        if not_found:
            print(f"⚠️ Could not find {len(not_found)} usernames:")
            for un in not_found[:10]:  # Show first 10
                print(f"   • {un}")
        print(f"📝 Saved to: {output_file}")
        print(f"{'='*50}\n")
        
    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()
    finally:
        await client.disconnect()

if __name__ == '__main__':
    asyncio.run(extract_residents())
