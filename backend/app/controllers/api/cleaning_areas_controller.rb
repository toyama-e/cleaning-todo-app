module Api
  class CleaningAreasController < ApplicationController
    def index
      cleaning_areas = CleaningArea.all   # cleaning_areasテーブルの全データを取得
      render json: cleaning_areas # JSON形式で返す
    end
  end
end
