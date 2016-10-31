package br.ufrj.cos482.service.dto;

import java.io.Serializable;
import java.util.Objects;


/**
 * A DTO for the DocumentoIdentificacao entity.
 */
public class DocumentoIdentificacaoDTO implements Serializable {

    private Long id;

    private String tipo;

    private String valor;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }
    public String getValor() {
        return valor;
    }

    public void setValor(String valor) {
        this.valor = valor;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        DocumentoIdentificacaoDTO documentoIdentificacaoDTO = (DocumentoIdentificacaoDTO) o;

        if ( ! Objects.equals(id, documentoIdentificacaoDTO.id)) return false;

        return true;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "DocumentoIdentificacaoDTO{" +
            "id=" + id +
            ", tipo='" + tipo + "'" +
            ", valor='" + valor + "'" +
            '}';
    }
}
