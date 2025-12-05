# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

# 担当者
users = [
  User.find_or_create_by!(name: "Aさん"),
  User.find_or_create_by!(name: "Bさん"),
  User.find_or_create_by!(name: "Cさん")
]

# 掃除箇所
areas = [
  CleaningArea.find_or_create_by!(name: "トイレ"),
  CleaningArea.find_or_create_by!(name: "お風呂"),
  CleaningArea.find_or_create_by!(name: "コンロ")
]

# タスク（12月のカレンダーに合わせて）
Task.find_or_create_by!(
  name:"お風呂掃除",
  do_at: DateTime.new(2025, 12, 4, 10, 0),
  cleaning_area: areas[1],
  user: users[0],
  status: "完了",
  memo: "特に汚れなし"
)

Task.find_or_create_by!(
  name:"トイレ掃除",
  do_at: DateTime.new(2025, 12, 5, 9, 00),
  cleaning_area: areas[0],
  user: users[1],
  status: "未完了",
  memo: ""
)

Task.find_or_create_by!(
  name: "コンロ掃除",
  do_at: DateTime.new(2025, 12, 13, 12, 0),
  cleaning_area: areas[1],
  user: users[1],
  status: "未完了",
  memo: ""
)

Task.find_or_create_by!(
  name:"お風呂掃除",
  do_at: DateTime.new(2025, 12, 13, 11, 0),
  cleaning_area: areas[0],
  user: users[0],
  status: "完了",
  memo: ""
)
