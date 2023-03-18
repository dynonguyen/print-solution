# Constants
ROOT_DIR="$(dirname "$(pwd)")"
APPS=("frontend" "services/account" "services/catalog" "services/chat" "services/docs" "services/notification" "services/order" "services/payment" "services/shipping")

# Utils function
function copy_env(){
  if ! [ -e ".env" ]
  then
    cp .env.example .env
  fi
}

function start_process() {
  echo "------------------- $1 -------------------"
}

function end_process() {
  echo "------------------- DONE -------------------"
}