module Api
  class UsersController < ApplicationController
    def index
      users = User.all   # usersテーブルの全データを取得
      render json: users # JSON形式で返す
    end
  end
end
