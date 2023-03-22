# Constants
ROOT_DIR="$(dirname "$(pwd)")"
APPS=("frontend" "services/account" "services/catalog" "services/chat" "services/docs" "services/notification" "services/order" "services/payment" "services/shipping")

# Utils function
function copy_env(){
  cp .env.example .env
}

function start_process() {
  echo "------------------- $1 -------------------"
}

function end_process() {
  echo "------------------- DONE -------------------"
}