class Api::V1::TasksController < ApplicationController

    # show / update / destroy のときだけ set_task メソッドを実行
    before_action :set_task, only: [:show, :update, :destroy]

    # GET /api/v1/tasks
    def index
        # 取得した全TaskをJSONとしてクライアントに返す
        tasks = Task.all
        render json: tasks
    end

    # GET /api/v1/tasks/:id
    def show
        # 取得した特定の1つのTaskをJSONとしてクライアントに返す
        render json: @task
    end

    # POST /api/v1/tasks
    def create
        # 新しいTaskを作成する (Create)
        @task = Task.new(task_params)

        if @task.save
            # 成功: 作成されたリソースと HTTPステータス 201 (Created) を返す
            render json: @task, status: :created
        else
            # 失敗: バリデーションエラーメッセージと HTTPステータス 422 (入力内容が不正で処理不能である) を返す
            render json: @task.errors, status: :unprocessable_entity
        end
    end

    # PATCH/PUT /api/v1/tasks/:id
    def update
        # Taskを更新
        if @task.update(task_params)
            # 成功: 更新された Task オブジェクトと HTTPステータス 200 (OK) を返す
            render json: @task
        else
            # 失敗: エラーメッセージと HTTPステータス 422 (入力内容が不正で処理不能である) を返す
            render json: @task.errors, status: :unprocessable_entity
        end
    end    

    # DELETE /api/v1/tasks/:id
    def destroy
        # Taskを削除
        @task.destroy
        # 成功: コンテンツなし (削除成功) の HTTPステータス 204 を返す
        head :no_content
    end

    private
    # 許可されたパラメータ以外を受け付けないようにするためのプライベートメソッド
    def task_params
        # 外部キーである :cleaning_area_id と :user_id も含める
        params.require(:task).permit(
        :name, :cleaning_area_id, :do_at, :done_at, :memo, :status, :user_id
    )
    end

    # IDを元に特定のTaskを取得するメソッド
    def set_task
        # Task.find(params[:id]) は、指定IDのタスクが見つからない場合に自動で 404 エラー（リクエストしたページがサーバー上に存在しない）を返す
        @task = Task.find(params[:id])
    end
end