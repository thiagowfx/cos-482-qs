package br.ufrj.cos482.service.dto;

import java.time.ZonedDateTime;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import br.ufrj.cos482.domain.enumeration.Funcoes;

/**
 * A DTO for the LogDoSistema entity.
 */
public class LogDoSistemaDTO implements Serializable {

    private Long id;

    private ZonedDateTime timestampFuncao;

    private Funcoes funcao;


    private Long usuarioId;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    public ZonedDateTime getTimestampFuncao() {
        return timestampFuncao;
    }

    public void setTimestampFuncao(ZonedDateTime timestampFuncao) {
        this.timestampFuncao = timestampFuncao;
    }
    public Funcoes getFuncao() {
        return funcao;
    }

    public void setFuncao(Funcoes funcao) {
        this.funcao = funcao;
    }

    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        LogDoSistemaDTO logDoSistemaDTO = (LogDoSistemaDTO) o;

        if ( ! Objects.equals(id, logDoSistemaDTO.id)) return false;

        return true;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "LogDoSistemaDTO{" +
            "id=" + id +
            ", timestampFuncao='" + timestampFuncao + "'" +
            ", funcao='" + funcao + "'" +
            '}';
    }
}
